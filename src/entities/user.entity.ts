
import { Entity, Column, PrimaryColumn,OneToMany,Relation } from "typeorm";

import { v4 as uuid } from "uuid"
import { Project } from "./projects.entity";
import { Skill } from "./skills.entity";

@Entity()
export class User {

    @PrimaryColumn('uuid')
    readonly id: string;


    @Column()
    name: string

    @Column() // about me
    description:string

    @Column()
    email: string

    @Column()
    password:string

    @OneToMany(()=>Skill,(skill)=>skill.user)
    skills:Relation<Skill[]>

    @OneToMany(()=>Project,(project)=>project.user)
    projects:Relation<Project[]>





    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
        