using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Above_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedSkillsprofToFeatures : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "SavingThrows",
                table: "Features",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<string>(
                name: "SkillProf",
                table: "Features",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SkillProf",
                table: "Features");

            migrationBuilder.AlterColumn<string>(
                name: "SavingThrows",
                table: "Features",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);
        }
    }
}
