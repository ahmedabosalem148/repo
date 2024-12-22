using BusinessLayer;

var builder = WebApplication.CreateBuilder(args);

// Register services
builder.Services.AddScoped<BundlesBL>(); // Add this line
builder.Services.AddScoped<UsersBL>();   // Add this line if UsersBL is also used

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:5173") // React frontend URL
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

// Add controllers
builder.Services.AddControllers();

// Add Swagger for API testing
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middleware pipeline
app.UseSwagger();
app.UseSwaggerUI();

// Enable CORS middleware
app.UseCors("AllowFrontend");

app.UseAuthorization();
app.MapControllers();
app.Run();
