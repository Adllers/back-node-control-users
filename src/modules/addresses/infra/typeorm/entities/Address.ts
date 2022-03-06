import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from '../../../../../modules/users/infra/typeorm/entities/Users';


@Entity('addresses')
class Appointment {

    // Relacionamento de Endereços para Usuário
    // Many to One -> muitos endereços para 1 usuário
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id'})
    user: User;

    @Column()
    country: string;

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    district: string;

    @Column()
    street: string;

    @Column()
    address_number: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Appointment;