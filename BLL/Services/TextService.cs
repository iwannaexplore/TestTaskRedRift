using BLL.Interfaces;

using DAL.Infrastructure;
using DAL.Infrastructure.Repositories;

namespace BLL.Services;

public class TextService:ITextService
{
 public TextService(IUserTextRepository userTextRepository, ICharacterRepository characterRepository)
 {
  UserTextRepository = userTextRepository;
  CharacterRepository = characterRepository;
 }
 public IUserTextRepository UserTextRepository { get; set; }
 public ICharacterRepository CharacterRepository { get; set; }
 
}
