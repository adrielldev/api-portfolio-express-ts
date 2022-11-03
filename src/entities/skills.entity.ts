
import { Entity, Column, PrimaryColumn,ManyToOne,Relation } from "typeorm";
import { User } from "./user.entity";
import { v4 as uuid } from "uuid"





@Entity()
export class Skill {

    @PrimaryColumn('uuid')
    readonly id: string;

    @Column({
        unique:true
    })
    name:string

    @Column({
        enum:["Frontend","Backend","Fullstack","Style","Other"]
    })
    type:string
    // frontend,backend,fullstack,style, other
    // coluna da imagem
    @Column()
    url_image:string

    

    @ManyToOne(()=>User,(user)=>user.skills)
    user:Relation<User>

    
    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }


}