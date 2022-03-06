import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAddresses1646586638998 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: 'addresses',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'

                    },
                    {
                        name: 'country',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'state',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'district',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'street',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'address_number',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        );


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('addresses');
    }

}
