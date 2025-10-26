using AutoMapper;
using Domain.entities;
using Application.DTOs;
using Application.Contracts;
using Persistence.Contracts;
using System.Threading.Tasks;
using System;

namespace Application.Services
{
    public class ChavePalestranteService : IChavePalestranteService 
    {
        private readonly IMapper _mapper;
        private readonly IGeralPersist geralPersist;
        private readonly IChavePalestrantesPersist chavePersist;

        public ChavePalestranteService(IMapper _mapper,
                                     IGeralPersist geralPersist,
                                     IChavePalestrantesPersist chavePersist)
        {
            this._mapper = _mapper;
            this.geralPersist = geralPersist;
            this.chavePersist = chavePersist; 
        }

        public async Task<ChavePalestrantesDTO> AddChavePalestrante(int userId, ChavePalestrantesDTO model)
        {
            try
            {
                // Se o controller passar null, ele cria um novo DTO. Perfeito.
                if (model == null) 
                    model = new ChavePalestrantesDTO();

                // Define os dados
                model.UserId = userId;
                model.Utilizada = false;
                model.DataCriacao = DateTime.Now;

                // Gera a chave
                if (string.IsNullOrWhiteSpace(model.Chave))
                {
                    model.Chave = Random.Shared.Next(10000000, 99999999).ToString();
                }

                var chave = _mapper.Map<ChavePalestrantes>(model);
                geralPersist.Add(chave);

                if (await geralPersist.SaveChangesAsync())
                {
                    var chaveRetorno = await chavePersist.GetChavePalestranteByChaveAsync(chave.Chave);
                    return _mapper.Map<ChavePalestrantesDTO>(chaveRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao persistir o cadastro da chave: {ex.Message}");
            }
        }

        public async Task<ChavePalestrantesDTO> UpdateChavePalestrante(int userId, int chaveId, ChavePalestrantesDTO model)
        {
            try
            {
                if(chaveId == 0 || model == null) throw new Exception("Erro ao Persistir atualização da Chave, ChaveID ou DTO Inválido");
                
                var chaveUpdate = await chavePersist.GetChavePalestranteByChaveAsync(chaveId.ToString());
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