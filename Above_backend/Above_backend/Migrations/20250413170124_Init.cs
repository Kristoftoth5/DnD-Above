using System;
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
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    HitDice = table.Column<string>(type: "TEXT", nullable: false),
                    StartingGold = table.Column<int>(type: "INTEGER", nullable: false),
                    SpellCaster = table.Column<int>(type: "INTEGER", nullable: false),
                    HalfCaster = table.Column<int>(type: "INTEGER", nullable: false),
                    ArmorProf = table.Column<string>(type: "TEXT", nullable: true),
                    WeaponProf = table.Column<string>(type: "TEXT", nullable: true),
                    ToolProf = table.Column<string>(type: "TEXT", nullable: true),
                    SavingThrows = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Classes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Equipments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Rarity = table.Column<string>(type: "TEXT", nullable: false),
                    ProfReq = table.Column<int>(type: "INTEGER", nullable: true),
                    EquipmentType = table.Column<string>(type: "TEXT", nullable: true),
                    DamageDie = table.Column<string>(type: "TEXT", nullable: true),
                    DamageType = table.Column<string>(type: "TEXT", nullable: true),
                    AC = table.Column<int>(type: "INTEGER", nullable: true),
                    Properties = table.Column<string>(type: "TEXT", nullable: true),
                    Consumable = table.Column<int>(type: "INTEGER", nullable: false),
                    Price = table.Column<int>(type: "INTEGER", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Attunement = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Equipments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Races",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    CreatureType = table.Column<string>(type: "TEXT", nullable: false),
                    Age = table.Column<string>(type: "TEXT", nullable: false),
                    Size = table.Column<string>(type: "TEXT", nullable: false),
                    Speed = table.Column<int>(type: "INTEGER", nullable: false),
                    Languages = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Races", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    UserName = table.Column<string>(type: "TEXT", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SubClasses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    OriginClassId = table.Column<int>(type: "INTEGER", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubClasses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubClasses_Classes_OriginClassId",
                        column: x => x.OriginClassId,
                        principalTable: "Classes",
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
                    Range = table.Column<string>(type: "TEXT", nullable: false),
                    Duration = table.Column<string>(type: "TEXT", nullable: false),
                    Ritual = table.Column<int>(type: "INTEGER", nullable: false),
                    CastingTime = table.Column<string>(type: "TEXT", nullable: false),
                    Component = table.Column<string>(type: "TEXT", nullable: false),
                    ComponentPrice = table.Column<int>(type: "INTEGER", nullable: true),
                    LearnedBy = table.Column<string>(type: "TEXT", nullable: false),
                    OriginEquipmentId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spells", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Spells_Equipments_OriginEquipmentId",
                        column: x => x.OriginEquipmentId,
                        principalTable: "Equipments",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Token = table.Column<string>(type: "TEXT", nullable: false),
                    Expires = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Saves",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Sheet = table.Column<string>(type: "TEXT", nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Saves", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Saves_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Features",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    LevelReq = table.Column<int>(type: "INTEGER", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    ArmorProf = table.Column<string>(type: "TEXT", nullable: true),
                    WeaponProf = table.Column<string>(type: "TEXT", nullable: true),
                    ToolProf = table.Column<string>(type: "TEXT", nullable: true),
                    SavingThrows = table.Column<string>(type: "TEXT", nullable: true),
                    SkillProf = table.Column<string>(type: "TEXT", nullable: true),
                    OriginClassId = table.Column<int>(type: "INTEGER", nullable: true),
                    OriginSubClassId = table.Column<int>(type: "INTEGER", nullable: true),
                    OriginRaceId = table.Column<int>(type: "INTEGER", nullable: true),
                    OriginEquipmentId = table.Column<int>(type: "INTEGER", nullable: true)
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
                        name: "FK_Features_Equipments_OriginEquipmentId",
                        column: x => x.OriginEquipmentId,
                        principalTable: "Equipments",
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
                name: "FeaturesToFeaturesConnections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OriginFeatureId = table.Column<int>(type: "INTEGER", nullable: false),
                    SubFeatureId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeaturesToFeaturesConnections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FeaturesToFeaturesConnections_Features_OriginFeatureId",
                        column: x => x.OriginFeatureId,
                        principalTable: "Features",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FeaturesToFeaturesConnections_Features_SubFeatureId",
                        column: x => x.SubFeatureId,
                        principalTable: "Features",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                name: "IX_FeaturesToFeaturesConnections_OriginFeatureId",
                table: "FeaturesToFeaturesConnections",
                column: "OriginFeatureId");

            migrationBuilder.CreateIndex(
                name: "IX_FeaturesToFeaturesConnections_SubFeatureId",
                table: "FeaturesToFeaturesConnections",
                column: "SubFeatureId");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                table: "RefreshTokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Saves_UserId",
                table: "Saves",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Spells_OriginEquipmentId",
                table: "Spells",
                column: "OriginEquipmentId");

            migrationBuilder.CreateIndex(
                name: "IX_SubClasses_OriginClassId",
                table: "SubClasses",
                column: "OriginClassId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FeaturesToFeaturesConnections");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "Saves");

            migrationBuilder.DropTable(
                name: "Spells");

            migrationBuilder.DropTable(
                name: "Features");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Equipments");

            migrationBuilder.DropTable(
                name: "Races");

            migrationBuilder.DropTable(
                name: "SubClasses");

            migrationBuilder.DropTable(
                name: "Classes");
        }
    }
}
