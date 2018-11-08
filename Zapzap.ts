declare function require (msg:string) : any;
var readline = require('readline-sync');

import{Mensagem} from "./Mensagem";
import{Usuario}from "./Usuario";
import{Chat} from "./Chat";

export class Zapzap{
    private usuarios : Array<Usuario>;
    private chats : Array<Chat>;

    public constructor (usuarios: Array<Usuario> = [], chats : Array<Chat> = []){
        this.usuarios = usuarios;
        this.chats = chats;
    }
    public getUsuarios() : Usuario[]{
        return this.usuarios;
    }
    public setUsuarios(usuarios : Usuario[]) : void{
        this.usuarios = usuarios;
    } 
    public getChats() : Chat[]{
        return this.chats;
    }
    public setChats(chats : Chat[]) : void {
        this.chats = chats;
    }

    public buscarUsusario(nome : string) : Usuario|undefined{
        for(let i of this.usuarios){
            if(i.getNome() == nome){
                return i;
            }
        }return undefined;
    }
    public deletUsuario(nome : string) : boolean{
        for(let idUser in this.usuarios){
            if(this.usuarios[idUser].getNome() == nome ){
                this.usuarios.splice(Number(idUser),1);
                return true
            }
        }
        return false;
    }

    public addUsuario(nome: string) : boolean{    
        if(this.buscarUsusario(nome) != undefined){
            return false;
        }else{
            this.usuarios.push(new Usuario(nome));
            return true;
        }
    }
    public buscarGrupo(nome : string) : Chat|undefined{
        for(let i of this.chats){
            if(i.getNome() == nome){
                return i;
            }
        }return undefined;
    }
    public addGrupo(grupo : string, pessoa : string) : number |undefined{
        let a : Usuario | undefined = this.buscarUsusario(pessoa);
        if(this.buscarGrupo(grupo) != undefined){
            return 1; //Grupo já existe
        }else if (a == undefined){
            return 2; //Usuario não encontrado
        }else{
            let b : Chat | undefined = (new Chat(grupo));
            this.chats.push(b);
            b.getUsuarios().push(a)
            return 3;
        }
    }
    public addUserGrupo(adm : string, pessoa:string, grupo:string) : string{
        let a : Usuario |undefined= this.buscarUsusario(adm);
        let b : Usuario| undefined = this.buscarUsusario(pessoa);
        let c : Chat | undefined= this.buscarGrupo(grupo);

        if (a == undefined){
            return "Adm nao encontrado";
        }else if(b == undefined){
            return "Pessoa nao existe";
        }else if(c == undefined){
            return "Grupo nao existe";
        }else if(c.buscarUsusario(pessoa)!=undefined){
            return "Pessoa ja esta no grupo";
        }else if(c.buscarUsusario(adm)==undefined){
            return "Pessoa não está no grupo";
        }else{
            c.getUsuarios().push(b)
            return "Inserido membro ao '" + grupo + "'.";
        }            
    }
    public enviarMsg(texto : string, pessoa : string, grupo: string) : number{
        let p : Usuario | undefined= this.buscarUsusario(pessoa);
        let g : Chat | undefined = this.buscarGrupo(grupo);

        if(p==undefined){
            return 1; //pessoa não existe
        }
        else if (g ==undefined){
            return 2; //grupo não existe
        }
        else if (g.buscarUsusario(pessoa)==undefined){
            return 3; //pessoa não está no grupo
        }else{
            g.getMensagens().push(new Mensagem( texto, p));
            return 0; //mensagem enviada
        }
    } 
    public buscarMensagensNovas(pessoa:string, grupo:string) : Mensagem[]{
        let p : Usuario | undefined = this.buscarUsusario(pessoa);
        let g : Chat | undefined = this.buscarGrupo(grupo);
        let res : Mensagem[] = [];

        if (p ==undefined){
            console.log("pessoa nao existe.")
        }else if(g==undefined){
            console.log("grupo nao existe")
        }else if(g.buscarUsusario(pessoa)==undefined){
            console.log("pessoa nao esta no '"+ g + "'.")
        }else{
            for(let m of g.getMensagens()){
                if(m.buscarLeitor(pessoa)== undefined){
                    res.push(m);
                    m.getLeitores().push(p);
                }
            }
        }
        console.log(res + "!!!");
        return res;
    }
    public mostrarMensagem(pessoa : string, grupo : string) : string{
        let mm : Array<Mensagem> = this.buscarMensagensNovas(pessoa, grupo);
        let res : string = "";
        for(let i of mm){
            res += i.toString() + "\n";
        }
        return res;
    }
    
    public iniciar() : void{
        while(true) {
            let possiveisComandos : string = "" + 
                "0 - Adcionar contato\n"+
                "1 - Criar novo grupo\n" +
                "2 - Adcionar membro ao grupo\n"+
                "3 - Mostrar usuarios cadastrados\n"+
                "4 - Mostrar grupos do usuario\n"+
                "5 - Mostrar quem está no grupo\n"+
                "6 - Sair ou remover do grupo\n"+
                "7 - Mandar mensagem\n"+
                "8 - Ver notificacoes\n"+
                "sair - sair do programa\n"
        console.log(possiveisComandos);
        let comando : string = readline.question ("Digite um comando: ");
            
        switch(comando){
            case "0" :
                let nome : string = readline.question("Digite o nome do contato: ");
                if(this.addUsuario(nome) == true){
                    console.log("Cadastro realizado.");
                }else{
                    console.log("Contato já cadastrado.");
                }
                break;
            case "1":
                let grupo : string = readline.question("Digite o nome do Grupo: ")
                let pessoa : string = readline.question("Digite seu nome: ")
                if(this.addGrupo(grupo, pessoa)== 1){
                    console.log("Grupo ja existe.");
                }else if (this.addGrupo(grupo, pessoa)== 2){
                    console.log("Usuário não encontrado.");
                }else{
                    console.log("Grupo '" + grupo +"' criado.")
                }
                break;
            case "2":
                grupo = readline.question("Digite o nome do Grupo: ");
                nome = readline.question("Digite o nome do novo membro: ");  
                let adm : string = readline.question("Digite o seu nome: ");  

                
                let resultado : string = this.addUserGrupo(adm, nome, grupo);
                console.log(resultado);
                
                break;    
            case "3":
                for(let i of this.usuarios){
                    console.log(i.getNome());
                    
                }
                break;
            case "4":
                for(let i of this.chats){
                    console.log(i.getNome());
                }
                break;
            case "5":
                grupo = readline.question("Digite o nome do grupo: ");
                let chat : Chat|undefined = this.buscarGrupo(grupo);
                if (chat == undefined){
                    console.log("Grupo não encontrado.");
                }else{
                    console.log(chat.mostrarUsuario());
                }
                break;
            case "6":
                grupo = readline.question("Digite o nome do grupo? ");
                chat = this.buscarGrupo(grupo);
                if(chat == undefined){
                    console.log("Grupo nao encontrado.")
                }else{
                    let nome : string = readline.question("Nome do usuario: ");
                    if(this.deletUsuario(nome)){
                        console.log("usuario removido do '" + grupo +"'.");
                    }else{
                        console.log("Usuario nao encontrado.")
                    }
                }
                break;
            case "7":
                let p :string = readline.question("Pessoa: ");
                let g : string = readline.question("Grupo: ");
                let t : string = readline.question("Digite a mensagem: ")

                let msg: number = (this.enviarMsg(t, p, g));
                if(msg == 1){
                    console.log("Pessoa nao encontrada");
                }else if(msg == 2){
                    console.log("Grupo nao encontrado.");
                }else if(msg == 3){
                    console.log("essa pessoa não esta no '" + g + "'.");
                }else{
                    console.log("Zap enviado.");
                }
                break;
            case "8":
                grupo = readline.question("Digite o nome do grupo: ");
                pessoa = readline.question("Nome do usuario: ");

                console.log( this.mostrarMensagem(pessoa, grupo));
                break;
            }  
            //readline.question("Aperte 'ENTER'");
        }         
                   
    }
}
