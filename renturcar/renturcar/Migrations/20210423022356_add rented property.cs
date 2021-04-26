using Microsoft.EntityFrameworkCore.Migrations;

namespace renturcar.Migrations
{
    public partial class addrentedproperty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Rented",
                table: "RentCars",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rented",
                table: "RentCars");
        }
    }
}
