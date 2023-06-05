using BLL.Interfaces;
using BLL.Services;
using DAL.EF;
using DAL.Infrastructure.Interfaces;
using DAL.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();
builder.Services.AddDbContext<ApplicationDbContext>((o) =>
 o.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"), 
  x => x.MigrationsAssembly("DAL")));

builder.Services.AddScoped<IUserTextRepository, UserTextRepository>();
builder.Services.AddScoped<ITextService, TextService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
 app.UseExceptionHandler("/Error");
 app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
