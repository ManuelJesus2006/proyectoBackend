export class Usuario {
  // Astra usa _id (generalmente un string UUID)
  _id?: string;

  email: string;

  pass: string;

  name: string;

  api_key: string;

  administrator: boolean
}