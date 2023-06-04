namespace DAL.Entities;

public class UserText
{
 public int Id { get; set; }
 public string Text { get; set; }
 public IEnumerable<Character> Characters { get; set; }
}
