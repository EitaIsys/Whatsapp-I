import{Mensagem} from "./Mensagem";
import{Usuario}from "./Usuario";

export class Chat {
    private nome : string;
    private usuarios : Array <Usuario>;
    private mensagens : Array <Mensagem>;

    public constructor (nome:string, usuarios : Array <Usuario> = [], mensagens : Array <Mensagem> = []){
        this.nome = nome;
        this.usuarios = usuarios;
        this.mensagens = mensagens;
    }
    public getNome() : string{
        return this.nome;
    }
    public setNome(nome : string) : void{
        this.nome = nome;
    }
    public getUsuarios() : Usuario []{
        return this.usuarios;
    }
    public setUsuarios(usuarios:Usuario[]) : void{
        this.usuarios = usuarios;
    }
    public getMensagens() : Mensagem[]{
        return this.mensagens;
    }
    public setMensagens(mensagens : Mensagem[]) : void{
        this.mensagens = mensagens;
    }
    public buscarUsusario(nome : string) : Usuario|undefined{
        for(let i of this.usuarios){
            if(i.getNome() == nome){
                return i;
            }
        }return undefined;
    }
    public mostrarUsuario() : string{
        let use : string = "";
        for(let i of this.usuarios){
            use += i.getNome() + ".\n";
        }
        return use;
    }

}
