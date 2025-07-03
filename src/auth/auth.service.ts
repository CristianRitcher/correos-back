import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsuariosService } from '../usuarios/usuarios.service';
import { ProveedoresService } from '../proveedores/proveedores.service';
import { CreateUserDto } from './dto/create-user.dto';
import { OAuthDto } from './dto/oauth.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usuariosService: UsuariosService,
        private proveedoresService: ProveedoresService,
    ) { }

    async signup(dto: CreateUserDto) {
        const hash = await bcrypt.hash(dto.contrasena, 10);
        const user = await this.usuariosService.create({
            correo: dto.correo,
            contrasena: hash,
            rol: 'usuario',
        });

        const token = await this.jwtService.signAsync({
            id: user.id,
            rol: user.rol,
        });

        return { token };
    }

    async oauth(dto: OAuthDto) {
        let proveedor = await this.proveedoresService.findBySub(dto.sub);
        let user;

        if (!proveedor) {
            user = await this.usuariosService.create({
                correo: dto.correo,
                contrasena: null,
                rol: 'usuario',
            });

            proveedor = await this.proveedoresService.create({
                proveedor: dto.proveedor,
                sub: dto.sub,
                id_usuario: user.id,
            });
        } else {
            user = await this.usuariosService.findById(proveedor.id_usuario);
        }

        const token = await this.jwtService.signAsync({
            id: user.id,
            rol: user.rol,
        });

        return { token };
    }

    async signin(dto: SignInDto) {
        let user = await this.usuariosService.findByCorreo(dto.correo);
        if (!user || !user.contrasena) throw new UnauthorizedException();

        const valid = await bcrypt.compare(dto.contrasena, user.contrasena);
        if (!valid) throw new UnauthorizedException();

        const token = await this.jwtService.signAsync({
            id: user.id,
            rol: user.rol,
        });

        return { token };
    }
}