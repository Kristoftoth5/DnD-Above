using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Above_backend.Migrations
{
    /// <inheritdoc />
    public partial class NamingCorrection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Features_Equipment_OriginEquipmentId",
                table: "Features");

            migrationBuilder.DropForeignKey(
                name: "FK_Spells_Equipment_OriginEquipmentId",
                table: "Spells");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Equipment",
                table: "Equipment");

            migrationBuilder.RenameTable(
                name: "Equipment",
                newName: "Equipments");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Equipments",
                table: "Equipments",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Features_Equipments_OriginEquipmentId",
                table: "Features",
                column: "OriginEquipmentId",
                principalTable: "Equipments",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Spells_Equipments_OriginEquipmentId",
                table: "Spells",
                column: "OriginEquipmentId",
                principalTable: "Equipments",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Features_Equipments_OriginEquipmentId",
                table: "Features");

            migrationBuilder.DropForeignKey(
                name: "FK_Spells_Equipments_OriginEquipmentId",
                table: "Spells");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Equipments",
                table: "Equipments");

            migrationBuilder.RenameTable(
                name: "Equipments",
                newName: "Equipment");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Equipment",
                table: "Equipment",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Features_Equipment_OriginEquipmentId",
                table: "Features",
                column: "OriginEquipmentId",
                principalTable: "Equipment",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Spells_Equipment_OriginEquipmentId",
                table: "Spells",
                column: "OriginEquipmentId",
                principalTable: "Equipment",
                principalColumn: "Id");
        }
    }
}
