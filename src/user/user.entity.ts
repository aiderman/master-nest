import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Decorator untuk mendefinisikan kelas sebagai entity
export class User {
    @PrimaryGeneratedColumn() // Kolom primary key yang auto-increment
    id: number;

    @Column() // Kolom untuk nama user
    name: string;

    @Column({ unique: true }) // Kolom untuk email, harus unik
    email: string;

    @Column() // Kolom untuk password
    password: string;
}