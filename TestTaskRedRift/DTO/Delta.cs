using System.Text.Json.Serialization;

using Newtonsoft.Json;

namespace TestTaskRedRift.DTO;

public class Delta
{
 [JsonProperty(PropertyName = "ops")]
 public List<Elements> Content { get; set; }
}
public class Elements
{
 [JsonProperty(PropertyName = "attributes")]
 public Settings? Settings { get; set; }
 [JsonProperty(PropertyName = "insert")]
 public string Insert { get; set; }
}
public class Settings
{
 [JsonProperty(PropertyName = "color")]
 public string Color { get; set; }
 [JsonProperty(PropertyName = "bold")]
 public bool Bold { get; set; } = false;
}
