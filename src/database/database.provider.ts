import { DataAPIClient, Db } from "@datastax/astra-db-ts";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AstraService {
  private readonly client: DataAPIClient;
  public readonly db: Db;

  constructor() {
    // Idealmente usa ConfigService para estas variables
    this.client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN);
    this.db = this.client.db(process.env.ASTRA_DB_ENDPOINT!);
  }
}