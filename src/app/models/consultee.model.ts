export class Consultee{
    private id!: string
    private username!:string
    private avatarUrl!:string
 
 
    constructor(){
      
    }
 
    public getId():string{
       return this.id
    }
 
    public setId(Id:string){
       this.id = Id
    }
 
    public getUsername():string{
       return this.username
    }
 
    public setUsername(username:string){
       this.username = username
    }
 
    public getAvatarUrl():string{
       return this.avatarUrl
    }
 
    public setAvatarUrl(avatarUrl:string){
       this.avatarUrl = avatarUrl
    }
 }
 
 