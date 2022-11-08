import { Entity, Column, PrimaryColumn,ManyToOne,ManyToMany,JoinTable,Relation } from "typeorm";
import { User } from "./user.entity";
import { Skill } from "./skills.entity";

import { v4 as uuid } from "uuid"


@Entity()
export class Project{
    @PrimaryColumn('uuid')
    readonly id: string;

    @Column()
    name:string;

    @Column()
    description:string

    @Column()
    stack:string
    // frontend,backend ou fullstack

    @Column()
    url_image:string

    @ManyToMany(()=>Skill)
    @JoinTable()
    skills:Relation<Skill[]>

    @ManyToOne(()=>User,(user)=>user.projects)
    user:Relation<User>







    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }

    


}
