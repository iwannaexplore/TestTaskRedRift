using DAL.Entities;

namespace BLL.Interfaces;

public interface ITextService
{
 public Task SaveUserText(UserText userText);
 public Task<UserText> GetLatestText();
}
