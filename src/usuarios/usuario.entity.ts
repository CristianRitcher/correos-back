import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    correo: string;

    @Column({ type: 'varchar', nullable: true })
    contrasena: string | null;

    @Column({ default: 'usuario' })
    rol: string;
}