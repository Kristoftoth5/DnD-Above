using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Above_backend.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Classes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Hit_Dice = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Starting_gold = table.Column<int>(type: "int", nullable: false),
                    SpellCaster = table.Column<int>(type: "int", nullable: false),
                    Armor_prof = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Weapon_prof = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tool_prof = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Classes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Equipment",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rarity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProfReq = table.Column<int>(type: "int", nullable: true),
                    DamageDie = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AC = table.Column<int>(type: "int", nullable: true),
                    Consumable = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Attunement = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipment", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Races",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatureType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Age = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Size = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Speed = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Races", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SubClasses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OriginClassId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubClasses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Features",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LevelReq = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OriginClassId = table.Column<int>(type: "int", nullable: true),
                    OriginSubClassId = table.Column<int>(type: "int", nullable: true),
                    OriginRaceId = table.Column<int>(type: "int", nullable: true),
                    OriginEquipmentId = table.Column<int>(type: "int", nullable: true),
                    Armor_prof = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Weapon_prof = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Tool_prof = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Saving_throws = table.Column<string>(type: "nvarchar(max)", nullable: true)
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
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    School = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Concentration = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Level = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Range = table.Column<int>(type: "int", nullable: false),
                    Duration = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ritual = table.Column<int>(type: "int", nullable: false),
                    CastingTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Component = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ComponentPrice = table.Column<int>(type: "int", nullable: true),
                    OriginClassId = table.Column<int>(type: "int", nullable: true),
                    OriginSubClassId = table.Column<int>(type: "int", nullable: true),
                    OriginRaceId = table.Column<int>(type: "int", nullable: true),
                    OriginEquipmentId = table.Column<int>(type: "int", nullable: true)
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
