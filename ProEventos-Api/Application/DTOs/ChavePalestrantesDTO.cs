using System;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs
{
    public class ChavePalestrantesDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        [StringLength(50, MinimumLength = 4, ErrorMessage = "O {0} deve ter entre 4 e 50 caracteres.")]
        public string Codigo { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        public bool Utilizada { get; set; } = false; // Valor padrão

        public DateTime DataCriacao { get; set; }

        public DateTime? DataUso { get; set; } // Nulável, pois pode não ter sido usada

        // Chave estrangeira para o usuário que criou/possui a chave
        [Required(ErrorMessage = "O {0} é obrigatório.")]
        public int UserId { get; set; } 

        // Opcional: Se a chave estiver ligada diretamente a um Palestrante
        public int? PalestranteId { get; set; }
        // public PalestranteDTO Palestrante { get; set; } // Se precisar retornar dados do palestrante
    }
}