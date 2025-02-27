using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Above_backend.Migrations
{
    /// <inheritdoc />
    public partial class Switched_To_SQLite : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Classes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Hit_Dice = table.Column<string>(type: "TEXT", nullable: false),
                    Starting_gold = table.Column<int>(type: "INTEGER", nullable: false),
                    SpellCaster = table.Column<int>(type: "INTEGER", nullable: false),
                    Armor_prof = table.Column<string>(type: "TEXT", nullable: true),
                    Weapon_prof = table.Column<string>(type: "TEXT", nullable: false),
                    Tool_prof = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Classes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Equipment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Rarity = table.Column<string>(type: "TEXT", nullable: false),
                    ProfReq = table.Column<int>(type: "INTEGER", nullable: true),
                    DamageDie = table.Column<string>(type: "TEXT", nullable: true),
                    AC = table.Column<int>(type: "INTEGER", nullable: true),
                    Consumable = table.Column<int>(type: "INTEGER", nullable: false),
                    Price = table.Column<int>(type: "INTEGER", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Attunement = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipment", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Races",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    CreatureType = table.Column<string>(type: "TEXT", nullable: false),
                    Age = table.Column<string>(type: "TEXT", nullable: false),
                    Size = table.Column<string>(type: "TEXT", nullable: false),
                    Speed = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Races", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SubClasses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    OriginClassId = table.Column<int>(type: "INTEGER", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubClasses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Features",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LevelReq = table.Column<int>(type: "INTEGER", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    OriginClassId = table.Column<int>(type: "INTEGER", nullable: true),
                    OriginSubClassId = table.Column<int>(type: "INTEGER", nullable: true),
                    OriginRaceId = table.Column<int>(type: "INTEGER", nullable: true),
                    OriginEquipmentId = table.Column<int>(type: "INTEGER", nullable: true),
                    Armor_prof = table.Column<string>(type: "TEXT", nullable: true),
                    Weapon_prof = table.Column<string>(type: "TEXT", nullable: true),
                    Tool_prof = table.Column<string>(type: "TEXT", nullable: true),
                    Saving_throws = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Features", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Features_Classes_OriginClassId",
                        column: x => x.OriginClassId,
                        principalTable: "Classes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Features_Equipment_OriginEquipmentId",
                        column: x => x.OriginEquipmentId,
                        principalTable: "Equipment",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Features_Races_OriginRaceId",
                        column: x => x.OriginRaceId,
                        principalTable: "Races",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Features_SubClasses_OriginSubClassId",
                        column: x => x.OriginSubClassId,
                        principalTable: "SubClasses",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Spells",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    School = table.Column<string>(type: "TEXT", nullable: false),
                    Concentration = table.Column<int>(type: "INTEGER", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Level = table.Column<int>(type: "INTEGER", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Range = table.Column<int>(type: "INTEGER", nullable: false),
                    Duration = table.Column<string>(type: "TEXT", nullable: false),
                    Ritual = table.Column<int>(type: "INTEGER", nullable: false),
                    CastingTime = table.Column<string>(type: "TEXT", nullable: false),
                    Component = table.Column<string>(type: "TEXT", nullable: false),
                    ComponentPrice = table.Column<int>(type: "INTEGER", nullable: true),
                    OriginClassId = table.Column<int>(type: "INTEGER", nullable: true),
                    OriginSubClassId = table.Column<int>(type: "INTEGER", nullable: true),
                    OriginRaceId = table.Column<int>(type: "INTEGER", nullable: true),
                    OriginEquipmentId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spells", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Spells_Classes_OriginClassId",
                        column: x => x.OriginClassId,
                        principalTable: "Classes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Spells_Equipment_OriginEquipmentId",
                        column: x => x.OriginEquipmentId,
                        principalTable: "Equipment",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Spells_Races_OriginRaceId",
                        column: x => x.OriginRaceId,
                        principalTable: "Races",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Spells_SubClasses_OriginSubClassId",
                        column: x => x.OriginSubClassId,
                        principalTable: "SubClasses",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Features_OriginClassId",
                table: "Features",
                column: "OriginClassId");

            migrationBuilder.CreateIndex(
                name: "IX_Features_OriginEquipmentId",
                table: "Features",
                column: "OriginEquipmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Features_OriginRaceId",
                table: "Features",
                column: "OriginRaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Features_OriginSubClassId",
                table: "Features",
                column: "OriginSubClassId");

            migrationBuilder.CreateIndex(
                name: "IX_Spells_OriginClassId",
                table: "Spells",
                column: "OriginClassId");

            migrationBuilder.CreateIndex(
                name: "IX_Spells_OriginEquipmentId",
                table: "Spells",
                column: "OriginEquipmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Spells_OriginRaceId",
                table: "Spells",
                column: "OriginRaceId");

            migrationBuilder.CreateIndex(
                name: "IX_Spells_OriginSubClassId",
                table: "Spells",
                column: "OriginSubClassId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Features");

            migrationBuilder.DropTable(
                name: "Spells");

            migrationBuilder.DropTable(
                name: "Classes");

            migrationBuilder.DropTable(
                name: "Equipment");

            migrationBuilder.DropTable(
                name: "Races");

            migrationBuilder.DropTable(
                name: "SubClasses");
        }
    }
}
