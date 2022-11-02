
import { Entity, Column, PrimaryColumn,ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { v4 as uuid } from "uuid"


@Entity()
export class Skill {

    @PrimaryColumn('uuid')
    readonly id: string;

    @Column()
    name:string

    @Column()
    description:string
    


}