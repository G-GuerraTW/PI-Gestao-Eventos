using System;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs
{
    public class ChavePalestrantesDTO
    {
        public int Id { get; set; }

        // A 'Chave' não é [Required] porque será gerada pelo servidor.
        // A validação de tamanho é boa se o usuário PUDER criar uma.
        // Se for SEMPRE gerada, pode remover as validações.
        [StringLength(50, MinimumLength = 4, ErrorMessage = "O {0} deve ter entre 4 e 50 caracteres.")]
        public string Chave { get; set; }

        // 'Utilizada' será definida como 'false' pelo servidor.
        public bool Utilizada { get; set; }

        // 'DataCriacao' será definida pelo servidor.
        public DateTime DataCriacao { get; set; }

        public DateTime? DataUso { get; set; } // Nulável

        // 'UserId' será preenchido pelo serviço, não precisa de validação aqui.
        public int UserId { get; set; }

        // Opcional
        public int? PalestranteId { get; set; }
    }
}