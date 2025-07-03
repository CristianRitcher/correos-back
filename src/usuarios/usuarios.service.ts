import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly repo: Repository<Usuario>,
    ) { }

    create(data: Partial<Usuario>) {
        const user = this.repo.create(data);
        return this.repo.save(user);
    }

    findByCorreo(correo: string) {
        return this.repo.findOne({ where: { correo } });
    }

    findById(id: number) {
        return this.repo.findOne({ where: { id } });
    }
}