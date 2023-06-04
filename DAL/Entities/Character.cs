namespace DAL.Entities;

public class Character
{
 public int Id { get; set; }
 public string Name { get; set; }
 public UserText UserText { get; set; }
 public int UserTextId { get; set; }
}
