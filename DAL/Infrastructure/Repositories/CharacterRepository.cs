using DAL.EF;
using DAL.Entities;

using Microsoft.EntityFrameworkCore;

namespace DAL.Infrastructure.Repositories;

public class CharacterRepository : ICharacterRepository
{

 private readonly ApplicationDbContext _context;
 public CharacterRepository(ApplicationDbContext context)
 {
  _context = context;
 }
 public async Task<IEnumerable<Character>> GetAllAsync()
 {
  return await _context.Characters.Include(c => c.UserText).ToListAsync();

 }
 public async Task<Character?> GetAsync(int id)
 {
  return await _context.Characters.Include(c => c.UserText).FirstOrDefaultAsync(c => c.Id == id);
 }
 public async Task CreateAsync(Character item)
 {
  await _context.Characters.AddAsync(item);
 }
 public void Update(Character item)
 {
  _context.Characters.Update(item);
 }
 public void Delete(Character item)
 {
  _context.Characters.Remove(item);
 }
 public async Task SaveChangesAsync()
 {
  await _context.SaveChangesAsync();
 }
}
