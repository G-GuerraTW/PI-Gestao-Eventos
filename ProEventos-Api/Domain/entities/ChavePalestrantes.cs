using Domain.Identity; // Supondo que User esteja aqui
using System.ComponentModel;

namespace Domain.entities
{
    public class ChavePalestrantes
    {
        public int Id { get; set; }
        
        [Description("O código de 8 dígitos")]
        public string Chave { get; set; }
        
        public bool Utilizada { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime? DataUso { get; set; }

        // Relacionamentos
        public int UserId { get; set; }
        public User User { get; set; } // Propriedade de navegação

        public int? PalestranteId { get; set; }
        // public Palestrante Palestrante { get; set; } // Propriedade de navegação
    }
}