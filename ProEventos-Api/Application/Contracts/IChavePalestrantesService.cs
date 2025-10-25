// No arquivo Application/Contracts/IChavePalestranteService.cs
using Application.DTOs;
using System.Threading.Tasks;

namespace Application.Contracts
{
    public interface IChavePalestranteService
    {
        /// <summary>
        /// Adiciona uma nova chave de palestrante.
        /// </summary>
        /// <param name="userId">ID do usuário logado.</param>
        /// <param name="model">DTO com os dados da nova chave.</param>
        /// <returns>O DTO da chave recém-criada.</returns>
        Task<ChavePalestrantesDTO> AddChavePalestrante(int userId, ChavePalestrantesDTO model);

        /// <summary>
        /// Atualiza os dados de uma chave, comumente usado para marcar como "Utilizada".
        /// </summary>
        /// <param name="userId">ID do usuário logado.</param>
        /// <param name="chaveId">ID da chave a ser atualizada.</param>
        /// <param name="model">DTO com os dados atualizados.</param>
        /// <returns>O DTO da chave atualizada.</returns>
        Task<ChavePalestrantesDTO> UpdateChavePalestrante(int userId, int chaveId, ChavePalestrantesDTO model);

        /// <summary>
        /// Deleta uma chave de palestrante.
        /// </summary>
        /// <param name="userId">ID do usuário logado.</param>
        /// <param name="chaveId">ID da chave a ser deletada.</param>
        /// <returns>True se foi deletada com sucesso.</returns>
    }
}