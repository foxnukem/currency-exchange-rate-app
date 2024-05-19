import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'EMAIL' })
export class Email {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 256 })
    email: string;
}
