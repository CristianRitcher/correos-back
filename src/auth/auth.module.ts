import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'; 
import { UsuariosService } from '../usuarios/usuarios.service';
import { ProveedoresService } from '../proveedores/proveedores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Proveedor } from '../proveedores/proveedor.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario, Proveedor]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '180d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, UsuariosService, ProveedoresService],
})
export class AuthModule { }