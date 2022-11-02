
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
    type:string
    // frontend,backend, style, other

    // coluna da imagem
    @Column()
    url_image:string

    

    @ManyToOne(()=>User,(user)=>user.skills)
    user:User

    
    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }


}