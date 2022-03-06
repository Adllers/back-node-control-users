import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserIdAndForeignKeyToAddresses1646587657066 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn('addresses', new TableColumn({
            name: 'user_id',
            type: 'uuid',
            isNullable: true, 
        }));

        await queryRunner.createForeignKey('addresses', new TableForeignKey({
            name: 'AddressUser', 
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE', 
         }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('addresses', 'AddressUser');
        await queryRunner.dropColumn('addresses', 'user_id');

    }

}
