> ## Dados
* Id do Usuário
* Id da Pelada

> ## Fluxo primário
1. Obter os dados do grupo da pelada a ser removida
2. Verificar se o usuário que solicitou a exclusão da pelada tem permissão (admin ou dono)
3. Remover a pelada com o Id acima
4. Remover todas as partidas dessa pelada

> ## Fluxo alternativo: Não foi encontrado um grupo id para o id da Pelada informada
1. Retornar erro

> ## Fluxo alternativo: O usuário não pertence ao grupo
2. Retornar erro

> ## Fluxo alternativo: O usuário não tem permissão
2, Retornar erro