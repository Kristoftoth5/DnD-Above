using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Above_backend.Migrations
{
    /// <inheritdoc />
    public partial class FixedSubClasses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_SubClasses_OriginClassId",
                table: "SubClasses",
                column: "OriginClassId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubClasses_Classes_OriginClassId",
                table: "SubClasses",
                column: "OriginClassId",
                principalTable: "Classes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubClasses_Classes_OriginClassId",
                table: "SubClasses");

            migrationBuilder.DropIndex(
                name: "IX_SubClasses_OriginClassId",
                table: "SubClasses");
        }
    }
}
