using AutoMapper;
using Application.DTOs;
using Application.Contracts;
using Persistence.Contracts;
using Domain.entities;

namespace Application.Services
{
    public class PalestranteService : IPalestranteService
    {
        private readonly IMapper _mapper;
        private readonly IGeralPersist geralPersist;
        private readonly IPalestrantePersist palestrantePersist;
        public PalestranteService(IMapper _mapper,
                                  IGeralPersist geralPersist,
                                  IPalestrantePersist palestrantePersist)
        {
            this._mapper = _mapper;
            this.geralPersist = geralPersist;
            this.palestrantePersist = palestrantePersist;        
        }

        public async Task<PalestranteDTO> AddPalestrante(PalestranteDTO model)
        {
            try
            {
                if(model == null) throw new Exception("Modelo inválido para persistir o registro.");
                var palestrante = _mapper.Map<Palestrante>(model);
                geralPersist.Add(palestrante);

                if(await geralPersist.SaveChangesAsync()) 
                {
                    var palestranteRetorno  = await palestrantePersist.GetPalestranteByIdAsync(palestrante.Id);
                    return _mapper.Map<PalestranteDTO>(palestranteRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {   
                throw new Exception($"Erro ao Persistir cadastro do palestrante: {ex.Message}");
            }
        }

        public async Task<PalestranteDTO> UpdatePalestrante(int PalestranteId, PalestranteDTO model)
        {
            try
            {
                if (model == null || PalestranteId == null || PalestranteId <= 0) throw new Exception("Erro ao alterar Palestrante, ID inválido ou Objeto Inconsistente");

                var palestrante = await palestrantePersist.GetPalestranteByIdAsync(PalestranteId);
                if(palestrante.Id != model.Id) throw new Exception("ID fornecido não bate com ID do objeto para ser alterado");
                geralPersist.Update(model);

                if(await geralPersist.SaveChangesAsync())
                {
                    var palestranteRetorno = await palestrantePersist.GetPalestranteByIdAsync(PalestranteId);
                    return _mapper.Map<PalestranteDTO>(palestranteRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao Alterar o Palestrante: {ex.Message}");
            }
        }

        public async Task<bool> DeletePalestrante(int PalestranteId)
        {
            try
            {
                if(PalestranteId == null || PalestranteId < 0) throw new Exception("ID Nulo ou Inexistente");
                var palestrante = await palestrantePersist.GetPalestranteByIdAsync(PalestranteId);
                if(palestrante != null) throw new Exception("ID Inexistente para exclusão");
                geralPersist.Delete(palestrante);

                if(await geralPersist.SaveChangesAsync())
                {
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                
                throw new Exception($"Erro ao persistir exclusão do palestrante: {ex.Message}");
            }
        }

        public async Task<PalestranteDTO[]> GetAllPalestrantesAsync(bool IncludeEvento = false)
        {
            try
            {
                var palestrantes = await palestrantePersist.GetAllPalestrantesAsync();
                var palestrantesRetorno = _mapper.Map<PalestranteDTO[]>(palestrantes);
                return palestrantesRetorno;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao Recuperar palestrantes: {ex.Message}");
            }
        }

        public async Task<PalestranteDTO[]> GetAllPalestrantesByNameAsync(string Name, bool IncludeEvento = false)
        {
            try
            {   
                if(Name == null) throw new Exception("Erro ao recuperar Palestrante: nome Nulo");
                var palestrantesRetorno = await palestrantePersist.GetAllPalestrantesByNameAsync(Name);
                return _mapper.Map<PalestranteDTO[]>(palestrantesRetorno);
            }
            catch (Exception ex)
            { 
                throw new Exception($"Erro ao Recuperar Palestrantes Pelo Nome: {ex.Message}");
            }
        }

        public async Task<PalestranteDTO> GetPalestranteByIdAsync(int Id, bool IncludeEvento = false)
        {
            try
            {
                if(Id == null || Id < 0) throw new Exception("Erro ao reucuperar Usuario ID Inexistente");
                var palestrante = await palestrantePersist.GetPalestranteByIdAsync(Id);
                return _mapper.Map<PalestranteDTO>(palestrante);
            }
            catch (Exception ex)
            {     
                throw new Exception($"Erro ao Recuperar Palestrante: {ex.Message}");
            }
        }
    }
}