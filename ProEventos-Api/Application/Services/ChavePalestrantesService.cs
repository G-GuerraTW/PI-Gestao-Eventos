using AutoMapper;
using Domain.entities;
using Application.DTOs;
using Application.Contracts;
using Persistence.Contracts;
using System.Threading.Tasks; // Adicionado para Task
using System; // Adicionado para Exception

namespace Application.Services
{
    // Assume que a interface IChavePalestranteService existe
    public class ChavePalestranteService : IChavePalestranteService 
    {
        private readonly IMapper _mapper;
        private readonly IGeralPersist geralPersist;
        private readonly IChavePalestrantesPersist chavePersist; // Trocado de Evento para Chave

        public ChavePalestranteService(IMapper _mapper,
                                     IGeralPersist geralPersist,
                                     IChavePalestrantesPersist chavePersist) // Trocado
        {
            this._mapper = _mapper;
            this.geralPersist = geralPersist;
            this.chavePersist = chavePersist; // Trocado
        }

        // Análogo ao AddEvento
        public async Task<ChavePalestrantesDTO> AddChavePalestrante(int userId, ChavePalestrantesDTO model)
        {
            try
            {
                if(model == null) throw new Exception("Objeto Nulo ou inválido");
                model.UserId = userId; // Assume que ChavePalestrantesDTO também tem UserId

                // Lógica de "Gerar Chave" pode ser adicionada aqui
                // Ex: Gerar o código antes de salvar
                if (string.IsNullOrWhiteSpace(model.Codigo))
                {
                    model.Codigo = Guid.NewGuid().ToString().Substring(0, 8).ToUpper();
                    model.Utilizada = false;
                    model.DataCriacao = DateTime.Now;
                }

                var chave = _mapper.Map<ChavePalestrantes>(model);
                geralPersist.Add(chave);

                if(await geralPersist.SaveChangesAsync())
                {
                    // Assume que o repositório tem este método
                    var chaveRetorno = await chavePersist.GetChavePalestranteByIdAsync(chave.Id);
                    return _mapper.Map<ChavePalestrantesDTO>(chaveRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao persistir o cadastro da chave: {ex.Message}");
            }
        }

        // Análogo ao UpdateEvento (poderia ser usado para "Utilizar Chave")
        public async Task<ChavePalestrantesDTO> UpdateChavePalestrante(int userId, int chaveId, ChavePalestrantesDTO model)
        {
            try
            {
                if(chaveId == 0 || model == null) throw new Exception("Erro ao Persistir atualização da Chave, ChaveID ou DTO Inválido");
                
                var chaveUpdate = await chavePersist.GetChavePalestranteByIdAsync(chaveId);
                if(chaveUpdate == null) throw new Exception("ID da Chave Inválido, Inexistente ou não pertence a este usuário.");

                // Lógica de "Utilizar Chave" pode ser tratada aqui
                if (model.Utilizada && !chaveUpdate.Utilizada)
                {
                    model.DataUso = DateTime.Now;
                }

                model.UserId = userId; // Garante o UserId
                model.Id = chaveId;    // Garante o Id

                _mapper.Map(model, chaveUpdate);
                geralPersist.Update(chaveUpdate);

                if (await geralPersist.SaveChangesAsync())
                {
                    return _mapper.Map<ChavePalestrantesDTO>(chaveUpdate);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao persistir atualização da chave: {ex.Message}");
            }
        }
    }
}