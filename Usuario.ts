import{Chat} from "./Chat";
export class Usuario{
    private nome:string;
    private grupos : Array<Chat> ;

    public constructor (nome : string, grupos : Array <Chat> = []){
        this.nome = nome;
        this.grupos = grupos;
    }
    public getNome () : string {
        return this.nome;
    }
    public setNome (nome:string) : void{
        this.nome = nome;
    }
    public getGrupos() : Chat[] {
        return this.grupos ;
    }
    public setGrupos(grupos:Chat[]):void{
        this.grupos = grupos;
    }
    

}