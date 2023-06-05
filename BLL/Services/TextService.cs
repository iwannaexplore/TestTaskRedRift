using BLL.Interfaces;

using DAL.Entities;
using DAL.Infrastructure;
using DAL.Infrastructure.Interfaces;
using DAL.Infrastructure.Repositories;

namespace BLL.Services;

public class TextService : ITextService
{
 public TextService(IUserTextRepository userTextRepository)
 {
  UserTextRepository = userTextRepository;
 }
 private IUserTextRepository UserTextRepository { get; set; }

 public async Task SaveUserText(UserText userText)
 {
  try
  {
   var allTexts = await UserTextRepository.GetAllAsync();
   var oldUserText = allTexts.FirstOrDefault();
   if (oldUserText == null)
   {
    await UserTextRepository.CreateAsync(userText);
   }
   else
   {
    oldUserText.Text = userText.Text;
    UserTextRepository.Update(oldUserText);
   }
   await UserTextRepository.SaveChangesAsync();
  }
  catch (Exception e)
  {
   Console.WriteLine(e);
   throw;
  }
 }
 public async Task<UserText> GetLatestText()
 {
  try
  {
   var allTexts = await UserTextRepository.GetAllAsync();
   var lastUserText = allTexts.FirstOrDefault();
   if (lastUserText == null)
   {
    return new UserText();
   }
   else
   {
    return lastUserText;
   }
  }
  catch (Exception e)
  {
   Console.WriteLine(e);
   throw;
  }

 }
}
