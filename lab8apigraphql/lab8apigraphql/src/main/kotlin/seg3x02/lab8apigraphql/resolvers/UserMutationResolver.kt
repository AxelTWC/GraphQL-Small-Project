package seg3x02.lab8apigraphql.resolvers

import graphql.kickstart.tools.GraphQLMutationResolver
import org.springframework.stereotype.Component
import seg3x02.lab8apigraphql.entity.user
import seg3x02.lab8apigraphql.repository.userRepository
import java.util.*

@Component
class UserMutationResolver (private val userRepositoryVAL: userRepository):
    GraphQLMutationResolver {
    fun newUser(
        firstName: String,
        lastName: String,
        email: String,
        phone: String
    ): user {
        val userVAL = user(firstName, lastName, email, phone)
        userRepositoryVAL.save(userVAL)
        return userVAL
    }
}