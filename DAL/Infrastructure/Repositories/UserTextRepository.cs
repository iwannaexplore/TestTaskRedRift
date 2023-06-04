using DAL.EF;
using DAL.Entities;

using Microsoft.EntityFrameworkCore;

namespace DAL.Infrastructure.Repositories;

public class UserTextRepository : IUserTextRepository
{
 private readonly ApplicationDbContext _context;
 public UserTextRepository(ApplicationDbContext context)
 {
  _context = context;
 }
 public async Task<IEnumerable<UserText>> GetAllAsync()
 {
  return await _context.UserTexts.ToListAsync();
 }
 public async Task<UserText?> GetAsync(int id)
 {
  return await _context.UserTexts.FirstOrDefaultAsync(c => c.Id == id);
 }
 public async Task CreateAsync(UserText item)
 {
  await _context.UserTexts.AddAsync(item);
 }
 public void Update(UserText item)
 {
  _context.UserTexts.Update(item);
 }
 public void Delete(UserText item)
 {
  _context.UserTexts.Remove(item);
 }
 public async Task SaveChangesAsync()
 {
  await _context.SaveChangesAsync();
 }

}
