
import {Usuario} from "./Usuario"
export class Mensagem{
    private texto : string;
    private emissor : Usuario;
    private leitores : Array<Usuario>;
        
    public constructor (texto : string, emissor : Usuario){
        this.texto = texto;
        this.emissor = emissor;
        this.leitores = [emissor];
        
    }
    public getTexto() : string{
        return this.texto;
    }
    public setTexto(texto : string) : void{
        this.texto = texto;
    } 
    public getEmissor() : Usuario{
        return this.emissor;
    }
    public setEmissor(emissor : Usuario) : void{
        this.emissor = emissor;
    }
    public getLeitores() : Array<Usuario>{
        return this.leitores;
    }
    public setLeitores(leitores : Array<Usuario>) : void{
        this.leitores = leitores;
    }
    public buscarLeitor(nome : string) : Usuario|undefined{
        for(let i of this.leitores){
            if(i.getNome() == nome){
                return i;
            }
        }return undefined;
    }
    public toString():string{
        let msg = "";
        msg += this.emissor.getNome() + ":" + this.texto;
        return msg;
    }
}