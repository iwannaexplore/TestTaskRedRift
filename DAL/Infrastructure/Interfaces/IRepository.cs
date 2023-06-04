namespace DAL.Infrastructure;

public interface IRepository<T> where T: class
{
 public Task<IEnumerable<T>> GetAllAsync();
 public Task<T?> GetAsync(int id);
 public Task CreateAsync(T item);
 public void Update(T item);
 public void Delete(T item);
 public Task SaveChangesAsync();
}
