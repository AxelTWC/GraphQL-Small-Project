package seg3x02.lab8apigraphql.resolvers

import graphql.kickstart.tools.GraphQLQueryResolver
import org.springframework.data.mongodb.core.MongoOperations
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Component
import seg3x02.lab8apigraphql.entity.user
import seg3x02.lab8apigraphql.repository.userRepository

@Component
class UserQueryResolver(val userRepositoryVAL: userRepository,
                        private val mongoOperations: MongoOperations
) : GraphQLQueryResolver {
    fun users(): List<user> {
        val list = userRepositoryVAL.findAll()
        return list
    }
}
