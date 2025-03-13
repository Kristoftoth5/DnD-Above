using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Above_backend.Migrations
{
    /// <inheritdoc />
    public partial class FixedSpellsAddedLearnedByColumnInsteadOfIdExceptEquipment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Spells_Classes_OriginClassId",
                table: "Spells");

            migrationBuilder.DropForeignKey(
                name: "FK_Spells_Races_OriginRaceId",
                table: "Spells");

            migrationBuilder.DropForeignKey(
                name: "FK_Spells_SubClasses_OriginSubClassId",
                table: "Spells");

            migrationBuilder.DropIndex(
                name: "IX_Spells_OriginClassId",
                table: "Spells");

            migrationBuilder.DropIndex(
                name: "IX_Spells_OriginRaceId",
                table: "Spells");

            migrationBuilder.DropIndex(
                name: "IX_Spells_OriginSubClassId",
                table: "Spells");

            migrationBuilder.DropColumn(
                name: "OriginClassId",
                table: "Spells");

            migrationBuilder.DropColumn(
                name: "OriginRaceId",
                table: "Spells");

            migrationBuilder.DropColumn(
                name: "OriginSubClassId",
                table: "Spells");

            migrationBuilder.AddColumn<string>(
                name: "LearnedBy",
                table: "Spells",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LearnedBy",
                table: "Spells");

            migrationBuilder.AddColumn<int>(
                name: "OriginClassId",
                table: "Spells",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OriginRaceId",
                table: "Spells",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OriginSubClassId",
                table: "Spells",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Spells_OriginClassId",
                table: "Spells",
                column: "OriginClassId");

            migrationBuilder.CreateIndex(
                name: "IX_Spells_OriginRaceId",
                table: "Spells",
                column: "OriginRaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Spells_OriginSubClassId",
                table: "Spells",
                column: "OriginSubClassId");

            migrationBuilder.AddForeignKey(
                name: "FK_Spells_Classes_OriginClassId",
                table: "Spells",
                column: "OriginClassId",
                principalTable: "Classes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Spells_Races_OriginRaceId",
                table: "Spells",
                column: "OriginRaceId",
                principalTable: "Races",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Spells_SubClasses_OriginSubClassId",
                table: "Spells",
                column: "OriginSubClassId",
                principalTable: "SubClasses",
                principalColumn: "Id");
        }
    }
}
