using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Above_backend.Migrations
{
    /// <inheritdoc />
    public partial class FixedProfNamings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Armor_prof",
                table: "Features");

            migrationBuilder.RenameColumn(
                name: "Weapon_prof",
                table: "Features",
                newName: "WeaponProf");

            migrationBuilder.RenameColumn(
                name: "Tool_prof",
                table: "Features",
                newName: "ToolProf");

            migrationBuilder.RenameColumn(
                name: "Saving_throws",
                table: "Features",
                newName: "ArmorProf");

            migrationBuilder.RenameColumn(
                name: "Weapon_prof",
                table: "Classes",
                newName: "SavingThrows");

            migrationBuilder.RenameColumn(
                name: "Tool_prof",
                table: "Classes",
                newName: "WeaponProf");

            migrationBuilder.RenameColumn(
                name: "Starting_gold",
                table: "Classes",
                newName: "StartingGold");

            migrationBuilder.RenameColumn(
                name: "Hit_Dice",
                table: "Classes",
                newName: "HitDice");

            migrationBuilder.RenameColumn(
                name: "Armor_prof",
                table: "Classes",
                newName: "ToolProf");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Races",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Languages",
                table: "Races",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "SavingThrows",
                table: "Features",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "ArmorProf",
                table: "Classes",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Races");

            migrationBuilder.DropColumn(
                name: "Languages",
                table: "Races");

            migrationBuilder.DropColumn(
                name: "SavingThrows",
                table: "Features");

            migrationBuilder.DropColumn(
                name: "ArmorProf",
                table: "Classes");

            migrationBuilder.RenameColumn(
                name: "WeaponProf",
                table: "Features",
                newName: "Weapon_prof");

            migrationBuilder.RenameColumn(
                name: "ToolProf",
                table: "Features",
                newName: "Tool_prof");

            migrationBuilder.RenameColumn(
                name: "ArmorProf",
                table: "Features",
                newName: "Saving_throws");

            migrationBuilder.RenameColumn(
                name: "WeaponProf",
                table: "Classes",
                newName: "Tool_prof");

            migrationBuilder.RenameColumn(
                name: "ToolProf",
                table: "Classes",
                newName: "Armor_prof");

            migrationBuilder.RenameColumn(
                name: "StartingGold",
                table: "Classes",
                newName: "Starting_gold");

            migrationBuilder.RenameColumn(
                name: "SavingThrows",
                table: "Classes",
                newName: "Weapon_prof");

            migrationBuilder.RenameColumn(
                name: "HitDice",
                table: "Classes",
                newName: "Hit_Dice");

            migrationBuilder.AddColumn<string>(
                name: "Armor_prof",
                table: "Features",
                type: "TEXT",
                nullable: true);
        }
    }
}
