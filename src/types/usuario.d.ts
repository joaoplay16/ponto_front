
type Usuario = {
    id: number,
    nome: string,
    cargo: string,
    nome_de_usuario: string,
    email: string,
    celular: string,
    criado_em: string,
    e_admin: number,
    ativo: number,
}

export type UsuarioComSenha = Omit<Usuario, "criado_em"> & {
    senha?: string
}

export default Usuario