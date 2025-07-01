using Microsoft.AspNetCore.StaticFiles;
using Nutrient_BlazorServer.Components;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

FileExtensionContentTypeProvider extensionProvider = new();
extensionProvider.Mappings.Add(".dll", "application/octet-stream");
extensionProvider.Mappings.Add(".dat", "application/octet-stream");
extensionProvider.Mappings.Add(".blat", "application/octet-stream");

app.UseStaticFiles(new StaticFileOptions
{
    ContentTypeProvider = extensionProvider
});
app.UseAntiforgery();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();
