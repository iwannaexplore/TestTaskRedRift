using BLL.Interfaces;
using BLL.Services;

using DAL.EF;
using DAL.Infrastructure;
using DAL.Infrastructure.Repositories;

using Microsoft.EntityFrameworkCore;

using TestTaskRedRift.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();
builder.Services.AddSingleton<WeatherForecastService>();
builder.Services.AddDbContext<ApplicationDbContext>((o) =>
{
 o.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"), x => x.MigrationsAssembly("DAL"));
});

builder.Services.AddScoped<IUserTextRepository, UserTextRepository>();
builder.Services.AddScoped<ITextService, TextService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
 app.UseExceptionHandler("/Error");
 // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
 app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
