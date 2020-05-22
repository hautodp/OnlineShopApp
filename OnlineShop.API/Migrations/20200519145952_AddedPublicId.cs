using Microsoft.EntityFrameworkCore.Migrations;

namespace OnlineShop.API.Migrations
{
    public partial class AddedPublicId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Photos",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsActive",
                table: "Manufacturers",
                nullable: true,
                oldClrType: typeof(bool));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "Photos");

            migrationBuilder.AlterColumn<bool>(
                name: "IsActive",
                table: "Manufacturers",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);
        }
    }
}
